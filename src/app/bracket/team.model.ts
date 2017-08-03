export class Team {
	rank: number;
	logo: string;
	className: string;
	name: string;

	constructor(rank: number, logo: string, className?: string, name?: string) {
		this.rank = rank;
		this.logo = logo;
		this.className = className;
		this.name = name;
	}
}