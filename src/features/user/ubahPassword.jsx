import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import {sendValidateToken} from '../../app/auth';


export default function UbahPassword() {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParams = urlParams.get('token');
    const tokenChangePass = localStorage.setItem("tokenUbah", tokenParams);
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false)
    
    console.log(tokenParams);
    
    // async function checkToken(tokenParams){
    //     const response = await sendValidateToken(tokenParams)
    //     setStatus(response.status);
    // }
    useEffect(()=>{

        // checkToken(tokenParams)
        // .catch(error =>{
        //     console.error('error cheking token :', error);
        // })
        // .finally(()=>{
        //     setTimeout(()=>{
        //         setLoading(false);
        //     },1000);
        // });
        
    },[]);

    // if(loading){
    //     return <div></div>
    // }
    if(status === 200){
        return (
            <div className="min-h-screen bg-base-200 flex items-center">
                <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                    <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                        <div className=''>
                            <LandingIntro />
                        </div>
                        <div className='py-24 px-10'>
                            {/* <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                            {validation && validation.error && (
                                <ErrorText styleClass="mt-8">{validation.error}</ErrorText>
                            )}
                            <form onSubmit={submitForm}>
                                <div className="mb-4">
                                    <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
                                    <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                                </div>
                                <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                                </div>
                                <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>
                                <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                            </form> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
}


