using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace BloodDonationRestApi.Models
{
    public class Post
    {

        [Key]
        public int PostId { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string WantedBlood { get; set; }
        public string Text { get; set; }
        public System.DateTime Time { get; set; }
        [Required]
        public string HospitalName { get; set; }
        [Required]
        public string ContactNumber { get; set; }

        [JsonIgnore, XmlIgnore]
        public virtual ICollection<FlagPost> FlagPosts { get; set; }

        [ForeignKey("userInfo")]
        public int UserId { get; set; }
        
        public virtual UserInfo userInfo { get; set; }
    }
}