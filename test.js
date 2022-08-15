const alerts= [
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:39.812847 172.30.96.1 -> 172.30.104.117\nICMP TTL:128 TOS:0x0 ID:9306 IpLen:20 DgmLen:60\nType:8  Code:0  ID:1   Seq:99  ECHO",
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:39.812867 172.30.104.117 -> 172.30.96.1\nICMP TTL:64 TOS:0x0 ID:45856 IpLen:20 DgmLen:60\nType:0  Code:0  ID:1  Seq:99  ECHO REPLY",
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:40.824130 172.30.96.1 -> 172.30.104.117\nICMP TTL:128 TOS:0x0 ID:9307 IpLen:20 DgmLen:60\nType:8  Code:0  ID:1   Seq:100  ECHO",
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:40.824162 172.30.104.117 -> 172.30.96.1\nICMP TTL:64 TOS:0x0 ID:45901 IpLen:20 DgmLen:60\nType:0  Code:0  ID:1  Seq:100  ECHO REPLY",
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:41.837507 172.30.96.1 -> 172.30.104.117\nICMP TTL:128 TOS:0x0 ID:9308 IpLen:20 DgmLen:60\nType:8  Code:0  ID:1   Seq:101  ECHO",
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:41.837543 172.30.104.117 -> 172.30.96.1\nICMP TTL:64 TOS:0x0 ID:45978 IpLen:20 DgmLen:60\nType:0  Code:0  ID:1  Seq:101  ECHO REPLY",
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:42.855613 172.30.96.1 -> 172.30.104.117\nICMP TTL:128 TOS:0x0 ID:9309 IpLen:20 DgmLen:60\nType:8  Code:0  ID:1   Seq:102  ECHO",
    "[**] [1:100001:1] ICMP Ping Detected [**]\n[Priority: 0] \n08/11-13:26:42.855636 172.30.104.117 -> 172.30.96.1\nICMP TTL:64 TOS:0x0 ID:46003 IpLen:20 DgmLen:60\nType:0  Code:0  ID:1  Seq:102  ECHO REPLY"
  ]

const cleaned = alerts.filter( a => a.includes("ECHO REPLY") === false )
  
 const reN = cleaned[0].split("\n", 3)

 /*
 const dandIP = reN[2].split(" ", 2)
 const cleanDate = dandIP[0].split(".", 1)

  console.log(dandIP)
console.log(cleanDate)

*/
const nu = cleaned.map( a => a.split("\n", 3))

class alert {
  constructor(alertType, priority, dateAndIP){
    this.alertType = alertType
    this.priority = priority
    this.dateAndIP = dateAndIP
  }
}

const nuObj = nu.map(a => ({ alertType:a[0], priority:a[1], dateAndIP:a[2] }))

console.log(cleaned)
console.log(cleaned.length)
console.log(nu)
console.log(nuObj)