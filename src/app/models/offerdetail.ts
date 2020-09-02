export class Offerdetail {
    applyLink: string;
    clause: string;
    company: string;
    experience?: string;
    expiryDate: Date;
    location: string;
    opportunities: string;
    positionDescription: string;
    publishDate: Date;
    requirements: string;
    title: string;
    daysTillExpire: number;

    constructor(applyLink: string, clause: string, company: string, expiryDate: Date, location: string, opportunities: string,
        positionDescription: string, publishDate: Date, requirements: string, title: string, daysTillExpire: number, experience?: string) {
            this.applyLink = applyLink;
            this.clause = clause;
            this.company = company;
            this.expiryDate = expiryDate;
            this.location = location;
            this.opportunities = opportunities;
            this.positionDescription = positionDescription;
            this.publishDate = publishDate;
            this.requirements = requirements;
            this.title = title;
            this.daysTillExpire = daysTillExpire;
            this.experience = experience;
        }
}
