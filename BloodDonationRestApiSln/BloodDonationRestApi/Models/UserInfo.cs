using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace BloodDonationRestApi.Models
{
    public class UserInfo
    {
        
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public System.DateTime DOB { get; set; }
        public string Type { get; set; }
        public string Docoment { get; set; }
        public string ProPic { get; set; }
        public string BloodGroup { get; set; }
        public Nullable<int> ReportCounter { get; set; }
        public string BanStatus { get; set; }
        public string isVerified { get; set; }
        public string darkMood { get; set; }
        public Nullable<int> Salary { get; set; }
        public Nullable<System.DateTime> LastDonate { get; set; }
        public string Gender { get; set; }
        public string NID { get; set; }
        public string Social_Profile { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<BloodBook> BloodBooks { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<FlagPost> FlagPosts { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        ////public virtual ICollection<Post> Posts { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<report> reports { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<report> reports1 { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<RequestBlood> RequestBloods { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<RequestBlood> RequestBloods1 { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<Salary> Salaries { get; set; }
        //public virtual UserInfo userInfo1 { get; set; }
        //public virtual UserInfo userInfo2 { get; set; }
        //public virtual UserInfo userInfo11 { get; set; }
        //public virtual UserInfo userInfo3 { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<donorRating> donorRatings { get; set; }

        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        public virtual ICollection<FlagPost> FlagPosts { get; set; }
    }
}