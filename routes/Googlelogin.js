import { GoogleSignin } from '@react-native-google-signin/google-signin';
import dotenv from 'dotenv';

dotenv.config();

GoogleSignin.configure({
     webClientId:process.env.GOOGLE_CLIENT_ID,
})

export default Googlelogin;