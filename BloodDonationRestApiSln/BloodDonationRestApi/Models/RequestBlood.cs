using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{
    public partial class RequestBlood
    {
        
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RequestId { get; set; }
        public string Request_Message { get; set; }
        [ForeignKey("userInfoUser")]
        public int UserId { get; set; }
        [ForeignKey("userInfoDonar")]
        public int DonarId { get; set; }
    
        public virtual UserInfo userInfoUser { get; set; }
        public virtual UserInfo userInfoDonar { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DonationReply> DonationReplies { get; set; }
    }
}
