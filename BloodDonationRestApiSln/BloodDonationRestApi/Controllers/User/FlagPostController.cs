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
        public IHttpActionResult GetAllPost(FlagPost fp)
        {
            context.FlagPosts.Add(fp);
            context.SaveChanges();
            return Created("api/posts/" + fp.FlagId, fp);
        }
    }
}
