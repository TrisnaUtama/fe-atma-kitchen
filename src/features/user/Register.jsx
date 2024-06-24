import {useState} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import useRegisterCustomer from '../../app/register'


function Register(){

    const { registerCustomer, registrationError } = useRegisterCustomer();
    const INITIAL_REGISTER_OBJ = {
        nama : "",
        no_telpn : "",
        tanggal_lahir : "",
        email : "",
        password : "",

    }

    const [loading, setLoading] = useState(false)
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)
    
        const submitForm = async (e) => {
            e.preventDefault();
            setLoading(true)
            await registerCustomer(registerObj);
            setLoading(false)
        };
    

    const updateFormValue = ({updateType, value}) => {
        // setErrorMessage("")
        setRegisterObj({...registerObj, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4">
                            <InputText defaultValue={registerObj.nama} updateType="nama" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={registerObj.no_telpn} updateType="no_telpn" containerStyle="mt-4" labelTitle="No Telepon" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={registerObj.tanggal_lahir}type="date" updateType="tanggal_lahir" containerStyle="mt-4" labelTitle="Tanggal Lahir" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={registerObj.email} type="email" updateType="email" containerStyle="mt-4" labelTitle="email" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>

                        </div>

                        <ErrorText styleClass="mt-8">{registrationError}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>

                        <div className='text-center mt-4'>Already have an account? <Link to="/"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register