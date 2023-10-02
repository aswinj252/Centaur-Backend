export default function  mailServiceInt (repositories) {
const SentMail = (name,email) => repositories.sentMail(name,email)
const rejectApplication = (name,email) => repositories.rejectApplication(name,email)
const SentVerification = (token,email) => repositories.SentVerification(token,email)
return {SentMail,rejectApplication,SentVerification}
}