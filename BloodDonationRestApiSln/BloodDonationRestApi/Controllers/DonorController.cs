using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BloodDonationRestApi.Models;
using BloodDonationRestApi.Attributes;
using System.Web;
using System.IO;

namespace BloodDonationRestApi.Controllers
{
    public class DonorController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpGet, Route("api/dprofile/{id}"), Auth]
        public IHttpActionResult GetProfile(int id)
        {
            if (context.UserInfos.Find(id) == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(context.UserInfos.Find(id));
        }

        [HttpPut, Route("api/dprofile/{id}"), Auth]
        public IHttpActionResult EditProfile([FromBody] UserInfo user, [FromUri] int id)
        {
            var userToEdit = context.UserInfos.Find(id);
            userToEdit.Address = user.Address;
            userToEdit.Name = user.Name;
            userToEdit.Email = user.Email;
            userToEdit.Phone = user.Phone;
            userToEdit.BloodGroup = user.BloodGroup;

            //context.Entry(post).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return Ok(user);
        }

        [HttpGet, Route("api/dposts/{id}")]
        public IHttpActionResult GetAllPostById(int id)
        {
            var data = context.UserInfos.Where(r => r.UserId == id).FirstOrDefault<UserInfo>();
            var bloodGroup = data.BloodGroup;
            var list = context.Posts.Where(r => r.WantedBlood == bloodGroup).ToList();
            return Ok(list);
        }

        [HttpGet, Route("api/drating/{id}")]
        public IHttpActionResult GetRatings(int id)
        {
            var rating = context.donorRatings.Where(r => r.userID == id).FirstOrDefault<donorRating>();
            if (rating != null)
            {
                return Ok(rating);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpGet, Route("api/dbloodgroup")]
        public IHttpActionResult GetBloodGroup()
        {
            var user = context.UserInfos.Where(r => r.Type == "Donor").ToList();
            return Ok(user);
        }

        [HttpGet, Route("api/duser")]
        public IHttpActionResult GetUsers()
        {
            var user = context.UserInfos.Where(r => r.Type.ToLower() == "user").ToList();
            return Ok(user);
        }

        [HttpPost, Route("api/donorReg")]
        public IHttpActionResult DonorReg(UserInfo user)
        {
            user.Type = "Donor";
            context.UserInfos.Add(user);
            context.SaveChanges();
            return Created("api/users/" + user.UserId, user);
        }

        [HttpGet, Route("api/bloodrequest/{id}")]
        public IHttpActionResult BloodRequest(int id)
        {
            var list = context.RequestBloods.Where(i => i.DonarId == id).ToList();
            return Ok(list);
        }

        [HttpGet, Route("api/reply/{id}")]
        public IHttpActionResult GetReplies(int id)
        {
            //var list = context.RequestBloods.Where(i => i.DonarId == id).ToList();
            //var list3 = new List<DonationReply>();
            //var list2 = context.DonationReply.Where(i => i.RequestId == list..RequestId).ToList()
            //return Ok(list);

            var response = context.DonationReply.Where(x => x.RequestId == id).FirstOrDefault<DonationReply>();
            var res = response.willDonate;
            return Ok(res);

            //var l = context.RequestBloods.Where(x => x.DonarId == id);
            //var l3 = new List<DonationReply>();
            //foreach (var item in l)
            //{
            //    var s = context.DonationReply.ToList().Find(x => x.RequestId == item.RequestId);
            //    l3.Add(s);
            //}
            //return Ok(l3.ToList());
        }

        [HttpGet, Route("api/dreply/{id}")]
        public IHttpActionResult Delete(int id)
        {
            var response = context.DonationReply.Where(x => x.RequestId == id).FirstOrDefault<DonationReply>();
            context.DonationReply.Remove(response);
            context.SaveChanges();
            return Ok(response);
        }

        [HttpGet, Route("api/reqresponseA/{id}")]
        public IHttpActionResult BloodRequestAccept(int id)
        {
            DonationReply req = new DonationReply();
            req.willDonate = "Accepted";
            req.RequestId = id;
            context.DonationReply.Add(req);
            context.SaveChanges();
            return Ok(req);
        }

        [HttpGet, Route("api/reqresponseR/{id}")]
        public IHttpActionResult BloodRequestDecline(int id)
        {
            DonationReply req = new DonationReply();
            req.willDonate = "Declined";
            req.RequestId = id;
            context.DonationReply.Add(req);
            context.SaveChanges();
            return Ok(req);
        }

        [HttpPost, Route("api/duploadfile/{id}")]
        public void UploadFile(int id)
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                var extension = System.IO.Path.GetExtension(httpPostedFile.FileName);
                if (httpPostedFile != null)
                {
                    // Validate the uploaded image(optional)


                    // Get the complete file path
                    var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedFiles"), id + extension);

                    //httpPostedFile.FileName
                    // Save the uploaded file to "UploadedFiles" folder
                    httpPostedFile.SaveAs(fileSavePath);
                    context.UserInfos.Find(id).ProPic = id + extension;
                    context.SaveChanges();
                }
            }
        }
    }
}
