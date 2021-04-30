using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BloodDonationRestApi.Models;
using System.Drawing;

namespace BloodDonationRestApi.Controllers
{
    public class UserInfoController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpGet, Route("api/users")]
        public IHttpActionResult GetAllUser()
        {
            return Ok(context.UserInfos.ToList());
        }
        [HttpGet, Route("api/users/{id}")]
        public IHttpActionResult GetUserById(int id)
        {
            if (context.UserInfos.Find(id) == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(context.UserInfos.Find(id));
        }

        //user registration
        [HttpPost, Route("api/userReg")]
        public IHttpActionResult UserReg(UserInfo user)
        {
            user.Type = "user";
            context.UserInfos.Add(user);
            context.SaveChanges();
            return Created("api/users/" + user.UserId, user);
        }

        [HttpPut, Route("api/users/{id}")]
        public IHttpActionResult EditUser([FromBody]UserInfo user, [FromUri]int id)
        {
            //if (context.UserInfoes.Find(id) == null)
            //{
            //    return StatusCode(HttpStatusCode.NoContent);
            //}

            user.UserId = id;
            context.Entry(user).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return Ok(user);

        }

        [HttpDelete, Route("api/users/{id}")]
        public IHttpActionResult RemoveUser(int id)
        {
            context.UserInfos.Remove(context.UserInfos.Find(id));
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpGet, Route("api/donarslist")]
        public IHttpActionResult DonarsList(String s)
        {
            if (s == null || s == "")
            {
                var list = context.UserInfos.Where(x => x.Type.ToLower() == "donor").ToList();
                return Ok(list);
            }
            //s = "A+";
            var list2 = context.UserInfos.Where(x => x.Type.ToLower() == "donor" && x.BloodGroup == s).ToList();
            return Ok(list2);
            //return Ok(s);
        }

        [HttpGet, Route("api/donarsbyGroup")]
        public IHttpActionResult DonarsListByGroup(String s)
        {
            //s = "A+";
            var list = context.UserInfos.Where(x => x.Type.ToLower() == "donor" && x.BloodGroup == s).ToList();
            return Ok(list);
            //return Ok(s);
        }

        [HttpPost, Route("api/imageUpload")]
        public IHttpActionResult ImageUpload(Image img)
        {
            return Created("", "");
        }

        [HttpGet, Route("api/user/login")]
        public IHttpActionResult UserLogin(String email, String pass)
        {
            var result = context.UserInfos.Where(x => x.Email == email && x.Password == pass);
            if (result.Any())
            {
                return Ok(result);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }


    }
}
