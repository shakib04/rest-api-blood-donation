using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{

    public partial class donorRating
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int rateId { get; set; }
        public int userID { get; set; }
        public Nullable<int> oneStar { get; set; }
        public Nullable<int> twoStar { get; set; }
        public Nullable<int> threeStar { get; set; }
        public Nullable<int> fourStar { get; set; }
        public Nullable<int> fiveStar { get; set; }
    
        public virtual UserInfo userInfo { get; set; }
    }
}
