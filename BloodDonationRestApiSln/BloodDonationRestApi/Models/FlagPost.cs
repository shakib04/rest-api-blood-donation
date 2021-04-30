using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{

    public partial class FlagPost
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FlagId { get; set; }

        public string FlagReason { get; set; }

        [ForeignKey("Post")]
        public int PostID { get; set; }
        public virtual Post Post { get; set; }

        [ForeignKey("userInfo")]
        public int userID { get; set; }
        public virtual UserInfo userInfo { get; set; }
    }
}
