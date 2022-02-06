import bcrypt from "bcrypt"
import { IsEmail } from "class-validator"
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Message from "./Message";
import Chat from './Chat';
import Verification from "./Verification";
import Ride from "./Ride";

const BCRYPT = 10
@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text", unique: true })
    @IsEmail()
    email: string;

    @Column({ type: "boolean", default: false })
    verifiedEmail: boolean;

    @Column({ type: "text" })
    firstName: string;

    @Column({ type: "text" })
    lastName: string;

    @Column({ type: "int" })
    age: number;

    @Column({ type: "text" })
    password: string;

    @Column({ type: "text" })
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    verifiedPhoneNumber: boolean;

    @Column({ type: "text" })
    profilePhoto: string;

    @Column({ type: "boolean", default: false })
    isDriving: boolean;

    @Column({ type: "boolean", default: false })
    isRiding: boolean;

    @Column({ type: "boolean", default: false })
    isTaken: boolean;

    @Column({ type: "double precision", default: 0 })
    lastLng: number;

    @Column({ type: "double precision", default: 0 })
    lastLat: number;

    @Column({ type: "double precision", default: 0 })
    lastOrientation: number;

    @OneToMany(type => Message, messages => messages.user)
    messages: Message[]

    @ManyToOne(type => Chat, chat => chat.participants)
    chat: Chat

    @OneToMany(type => Verification, verification => verification.user)
    verifications: Verification[]

    @OneToMany(type => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[]

    @OneToMany(type => Ride, ride => ride.driver)
    ridesAsDriver: Ride[]

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    @CreateDateColumn() createAt: string;

    @UpdateDateColumn() updateAt: string;

    public comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if (this.password) {
            const hashedPassword = await this.hashPassword(this.password)
            this.password = hashedPassword
        }
    }

    private hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT);
    }
}

export default User