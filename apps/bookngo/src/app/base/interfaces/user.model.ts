import { UserDto } from "@common";

export class User {
    name: string
    
    constructor(userDto: UserDto) {
        this.name = userDto.fullName
    }
}