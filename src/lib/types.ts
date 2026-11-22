export type Role="student"|"tutor"|"admin";
export type Plan="free"|"pro";
export type User={id:string;name:string;email:string;role:Role;plan:Plan;phone?:string;bio?:string;image?:string;savedTuitionIds?:string[];createdAt?:string};
export type Tuition={id:string;_id?:string;title:string;subject:string;classLevel:string;mode:"Online"|"Offline";location:string;monthlyFee:number;daysPerWeek:number;bannerImage?:string;description:string;tutorName:string;tutorEmail:string;approvalStatus:"pending"|"approved"|"rejected";isActive:boolean;createdAt:string;offeringType?:string;reviews?:Review[]};
export type Review={studentName:string;studentEmail:string;rating:number;comment:string;createdAt:string};
export type Application={id:string;tuitionId:string;tuitionTitle:string;subject:string;monthlyFee:number;tutorEmail:string;tutorName:string;studentName:string;studentEmail:string;studentPhone:string;preferredSchedule:string;studentNote:string;status:"pending"|"accepted"|"rejected";appliedAt:string};
export type Payment={id:string;userName:string;userEmail:string;userRole:string;planName:string;amount:number;currency:string;transactionId:string;paidAt:string;paymentStatus:string};
export type PageList<T>={items:T[];total:number;page:number;limit:number;pages:number};
