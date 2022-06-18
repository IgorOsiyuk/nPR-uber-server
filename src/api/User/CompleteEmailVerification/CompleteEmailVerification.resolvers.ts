import User from 'src/entities/User';
import { Resolvers } from '../../../types/resolvers';
import { CompleteEmailVerificationMutationArgs, CompleteEmailVerificationResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import Verification from '../../../entities/Verification';


const resolvers: Resolvers = {
    Mutation: {
        CompleteEmailVerification: privateResolver(async (_, args: CompleteEmailVerificationMutationArgs, { req }): Promise<CompleteEmailVerificationResponse> => {
            const user: User = await req.user
            const { key } = args
            if (user.email && !user.verifiedEmail) {
                try {
                    const verification = await Verification.findOne({
                        key,
                        payload: user.email
                    })
                    if (verification) {
                        user.verifiedEmail = true;
                        user.save();
                        verification.verified = true
                        verification.save()
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can not verify your email"
                        }
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
                    error: "You do not have email to verify"
                }
            }
        })
    }
}
export default resolvers