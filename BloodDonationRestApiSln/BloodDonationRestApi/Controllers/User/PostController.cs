using BloodDonationRestApi.Attributes;
using BloodDonationRestApi.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BloodDonationRestApi.Controllers
{
    public class PostController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpGet, Route("api/posts")]
        public IHttpActionResult GetAllPost()
        {
            return Ok(context.Posts.ToList());
        }

        [HttpGet, Route("api/posts/{id}")]
        public IHttpActionResult GetAllPostById(int id)
        {
            return Ok(context.Posts.Find(id));
        }

        [HttpPost, Route("api/posts"), Auth]
        public IHttpActionResult Post(Post p)
        {
            p.Time = DateTime.Now;
            context.Posts.Add(p);
            context.SaveChanges();
            return Created("api/posts/" + p.PostId, p);
        }

        [HttpDelete, Route("api/posts/{id}")]
        public IHttpActionResult DeletePost(int id)
        {
            var list =context.FlagPosts.Where(x => x.PostID == id);
            foreach (var item in list)
            {
                context.FlagPosts.Remove(context.FlagPosts.Find(item.FlagId));
            }
            context.Posts.Remove(context.Posts.Find(id));
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPut, Route("api/posts/{id}")]
        public IHttpActionResult UpdatePost([FromBody]Post post, [FromUri]int id)
        {
            var postToEdit = context.Posts.Find(id);
            postToEdit.Address = post.Address;
            postToEdit.Text = post.Text;
            postToEdit.WantedBlood = post.WantedBlood;
            postToEdit.HospitalName = post.HospitalName;
            postToEdit.ContactNumber = post.ContactNumber;

            //context.Entry(post).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return Ok(post);
        }

        [HttpGet, Route("api/mypost/{id}")]
        public IHttpActionResult GetMyPost(int id)
        {
            return Ok(context.Posts.Where(x => x.UserId == id).ToList());
        }

        [HttpGet, Route("api/mypostmonth/{id}")]
        public IHttpActionResult GetMyPostMonth(int id)
        {
            var jan = 0;
            var feb = 0;
            var mar = 0;
            var apr = 0;
            var may = 0;
            var jun = 0;
            var jul = 0;
            var aug = 0;
            var sep = 0;
            var oct = 0;
            var nov = 0;
            var dec = 0;

            var posts = context.Posts.Where(x => x.UserId == id).ToList();
            foreach (var item in posts)
            {
                if (item.Time.Month == 1)
                {
                    jan++;
                }
                if (item.Time.Month == 2)
                {
                    feb++;
                }
                if (item.Time.Month == 3)
                {
                    mar++;
                }
                if (item.Time.Month == 4)
                {
                    apr++;
                }
                if (item.Time.Month == 5)
                {
                    may++;
                }
                if (item.Time.Month == 6)
                {
                    jun++;
                }
                if (item.Time.Month == 7)
                {
                    jul++;
                }
                if (item.Time.Month == 8)
                {
                    aug++;
                }
                if (item.Time.Month == 9)
                {
                    sep++;
                }
                if (item.Time.Month == 10)
                {
                    oct++;
                }
                if (item.Time.Month == 11)
                {
                    nov++;
                }
                if (item.Time.Month == 12)
                {
                    dec++;
                }
            }

            string json = @"{ 'jan': " + jan + ",  'feb': " + feb + ",'mar': " + mar + ",  'apr': " + apr + ",'may': " + may + ",  'jun': " + jun + ",'jul': " + jul + ",  'aug': " + aug + ",'sep': " + sep + ",  'oct': " + oct + ",'nov': " + nov + ",  'dec': " + dec + ",}";
            return Ok(JObject.Parse(json));
        }
    }
}
