using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BloodDonationRestApi.Models;
using BloodDonationRestApi.Attributes;

namespace BloodDonationRestApi.Controllers.User
{
    public class ProfileController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpGet, Route("api/profile/{id}"), Auth]
        public IHttpActionResult ShowPrimaryInfo(int id)
        {
            if (context.UserInfos.Find(id) == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(context.UserInfos.Find(id));
        }
        [HttpPut, Route("api/profile/{id}"), Auth]
        public IHttpActionResult EditProfilePrimary([FromBody]UserInfo user, [FromUri]int id)
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
    }
}
