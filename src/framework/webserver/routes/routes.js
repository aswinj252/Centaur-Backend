import { PatientAuthRouter,DoctorAuthRouter,AdminAuthRouter} from "./index.js"
 const routes = (app, express) => {
  
    app.get('/', (req, res) => {
        res.send('Hospital management');
    });
app.use('/api/v1/patient',PatientAuthRouter(express));
app.use('/api/v1/doctor',DoctorAuthRouter(express));
app.use('/api/v1/admin',AdminAuthRouter(express));

}
export default routes

