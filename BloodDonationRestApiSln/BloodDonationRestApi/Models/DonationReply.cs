using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{
    
    public partial class DonationReply
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int replyId { get; set; }
        public int RequestId { get; set; }
        public string willDonate { get; set; }
    
        public virtual RequestBlood RequestBlood { get; set; }
    }
}
