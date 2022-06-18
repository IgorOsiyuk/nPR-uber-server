import User from 'src/entities/User';
import Verification from '../../../entities/Verification';
import { RequestEmailVerificationResponse } from 'src/types/graph';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { sendVerificationEmail } from '../../../utils/sendEmail';

const resolvers: Resolvers = {
    Mutation: {
        RequestEmailVerification: privateResolver(async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
            const user: User = await req.user;
            if (user.email) {
                try {
                    const oldVerivication = await Verification.findOne({
                        payload: user.email
                    })
                    if (oldVerivication) {
                        oldVerivication.remove();
                    }
                    const newVerification = await Verification.create({
                        payload: user.email,
                        target: "EMAIL"
                    }).save()
                    await sendVerificationEmail(user.fullName, newVerification.key);
                    return {
                        ok: true,
                        error: null
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "Your user has no email to verify"
                }
            }
        })
    }
}

export default resolvers