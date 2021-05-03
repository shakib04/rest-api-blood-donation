using BloodDonationRestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BloodDonationRestApi.Controllers
{
    public class FlagPostController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpPost, Route("api/flagpost")]
        public IHttpActionResult FlagPost(FlagPost fp)
        {
            context.FlagPosts.Add(fp);
            context.SaveChanges();
            return Created("api/posts/" + fp.FlagId, fp);
        }

        [HttpGet, Route("api/flagpost/userid/{id}")]
        public IHttpActionResult FlagPost(int id)
        {
            return Ok(context.FlagPosts.Where(x => x.userID == id).ToList());
        }

        [HttpGet, Route("api/IsItMyPost")]
        public IHttpActionResult IsItMyPost(int userid, int postid)
        {
            return Ok(context.Posts.Any(x => x.PostId == postid && x.UserId == userid));
        }


    }
}
