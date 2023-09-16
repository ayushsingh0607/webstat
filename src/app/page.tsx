'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import axios from 'axios';
import Image from 'next/image';


const page = () => {
  const [url, setUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [getdetails, setGetdetails] = useState(true);
  const router = useRouter();
  const postdata = async () => {
    const option = [
      { url: url }
    ]
    const { data } = await axios({
      method: 'post',
      url: 'https://api.dataforseo.com/v3/on_page/lighthouse/live/json',
      auth: {
        username: 'ayushraj0607@gmail.com',
        password: 'd9c7cb8f6e3126a1'
      },
      data: option,
      headers: {
        'content-type': 'application/json'
      }
    })
    // console.log(data);
    const scoredata = { id: data.tasks[0].id, result: data.tasks[0].result[0]}
    localStorage.setItem("score", JSON.stringify(scoredata));
    router.push(`/results/${url.replace("https://", "")}`)
  }
  const handleChange = (event: any) => {
    setUrl(event.target.value);
  }
  return (
    <div className='bg-[#313f4f] h-screen relative'>
      {getdetails &&
        <div className='flex flex-col items-center gap-10 h-screen justify-center'>
          <div className='absolute bg-[#4ca8b3] w-[250px] h-[250px] rounded-full top-24 -left-20'></div>
          <div className='absolute bg-[#e66e61] w-[250px] h-[250px] rounded-full -top-10 left-20'></div>
          <div className='absolute bg-[#5a82c5] w-[250px] h-[250px] rounded-full -top-36 left-32'></div>
          <div className='absolute bg-[#efa86d] w-[280px] h-[280px] rounded-full -top-20 -left-20'></div>
          <div className='flex flex-col gap-1 items-center '>
            <h1 className='text-[40px] text-[#e1e0e1] font-bold'>Web Stats</h1>
            <span className='text-[20px] text-[#e1e0e1] font-semibold text-center'>Grade your website in seconds.Then learn how to <br />improve it for free.</span>
          </div>
          <div className='flex flex-col gap-16'>
            <div className=' border-b-2 border-[#e1e0e1] p-1 w-[473px]'>
              <input type="url" required style={{ border: 'none', outline: 'none', background: '#313f4f', color: '#FFF', width: '100%', fontSize: '25px', fontWeight: '600', textAlign: 'center' }} className='placeholder:font-semibold placeholder:text-center placeholder:text-[18px]' placeholder='Website(e.g.:https://dataforseo.com/)' onChange={handleChange} />
            </div>
            <div className=' border-b-2 border-[#e1e0e1] p-1 w-[473px]'>
              <input type="text" style={{ border: 'none', outline: 'none', background: '#313f4f', color: '#FFF', width: '100%', fontSize: '25px', fontWeight: '600', textAlign: 'center' }} className='placeholder:font-semibold placeholder:text-center placeholder:text-[18px] ' placeholder='Email(optional)' />
            </div>
          </div>
          <span className='w-[400px] text-[12px] text-[#e1e0e1] text-center'>We're committed to your privacy. WebStat uses the information you provide to us to contact you about out relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our <br />Privacy Policy.</span>
          <button type='button' className='bg-[#ef8062] p-3 rounded-md text-white' onClick={() => { postdata(); setLoader(true);setGetdetails(false) }}>Get your score</button>
        </div>
      }
      {loader &&
        <div className='flex flex-col justify-center items-center'>
          <Image src={'/Spinner.gif'} alt='spinner' width={500} height={500} />
          <div className='text-white text-[48px] font-[600] flex flex-col items-center text-center'>
            <span>Thank you for your Patience.</span>
            <span >We are calculating your results...</span>
          </div>
        </div>
      }
    </div>

  )
}
export default page