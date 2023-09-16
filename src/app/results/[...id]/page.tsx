'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';

const page = () => {

  const [alldata, setAlldata] = useState<any[]>([]);
  const [newdata, setNewdata] = useState<any[]>([]);
  const [initial, setInitial] = useState(true);
  const getdata = async () => {
    const score = JSON.parse(localStorage.getItem("score") || "[]")
    alldata.push(score)
    setAlldata([...alldata]);
    console.log(alldata);
    const options = [{
      url:alldata[0]?.result?.finalUrl,
      enable_javascript:true,
      enable_browser_rendering:true
    }]
    const { data } = await axios({
      method: 'post',
      url: `https://api.dataforseo.com/v3/on_page/instant_pages`,
      auth: {
        username: 'ayushraj0607@gmail.com',
        password: 'd9c7cb8f6e3126a1'
      },
      data: options,
      headers: {
        'content-type': 'application/json'
      }
    })
    console.log(data)
    newdata.push(data.tasks[0].result[0])
    setNewdata([...newdata])
  }
  useEffect(() => {
    if (initial) {
      setInitial(false)
    } else {
      getdata();
    }
  }, [initial])
  return (
    <div className='flex w-full bg-[#EFF3FD]'>
      <div className='bg-[#2d3e50] w-[26%] h-screen flex flex-col items-center  sticky left-0 top-0 gap-5 justify-center p-10 px-10'>
        <div className='relative'>
          <CircularProgress size={150} variant='determinate' value={newdata[0]?.items[0]?.["onpage_score"]} sx={{color:'#00bda5'}}/>
          <span className='text-[48px] text-white font-[700] absolute left-12 top-10'>{Math.round(newdata[0]?.items[0]?.["onpage_score"]) || 0}</span>
        </div>
        <span className='text-white'>{(alldata[0]?.result?.finalUrl)?.replace("https://", "")}</span>
        <div className='flex flex-col gap-10'>
          <div>
            <div className='flex justify-between'>
              <span className='text-white text-[14px] font-[400] uppercase'>Performance</span>
              <div>
                <span className='text-[18px] font-[700] text-white'>{Math.round((alldata[0]?.result?.categories?.performance?.score) * 100) || 0}</span>
                <span className='text-[16px] text-[#7c98b6] font-[700]'>/100</span>
              </div>
            </div>
            <div className='flex items-center text-center'>
              <div className='w-[98%] bg-[#DBDBDB] h-[10px] rounded-lg'>
                <div style={{ width: `${(alldata[0]?.result?.categories?.performance?.score) * 100}%`, height: '10px', backgroundColor: '#00bda5', borderRadius: '12px' }}>{ }</div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <span className='text-white text-[14px] font-[400] uppercase'>seo</span>
              <div>
                <span className='text-[18px] font-[700] text-white'>{Math.round((alldata[0]?.result?.categories?.seo?.score) * 100) || 0}</span>
                <span className='text-[16px] text-[#7c98b6] font-[700]'>/100</span>
              </div>
            </div>
            <div className='flex items-center text-center'>
              <div className='w-[300px] bg-[#DBDBDB] h-[10px] rounded-lg'>
                <div style={{ width: `${(alldata[0]?.result?.categories?.seo?.score) * 100}%`, height: '10px', backgroundColor: '#00bda5', borderRadius: '12px' }}>{ }</div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <span className='text-white text-[14px] font-[400] uppercase'>Accessibility</span>
              <div>
                <span className='text-[18px] font-[700] text-white'>{Math.round((alldata[0]?.result?.categories?.accessibility?.score) * 100) || 0}</span>
                <span className='text-[16px] text-[#7c98b6] font-[700]'>/100</span>
              </div>
            </div>
            <div className='flex items-center text-center'>
              <div className='w-[300px] bg-[#DBDBDB] h-[10px] rounded-lg'>
                <div style={{ width: `${(alldata[0]?.result?.categories?.accessibility?.score) * 100}%`, height: '10px', backgroundColor: '#00bda5', borderRadius: '12px' }}>{ }</div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <span className='text-white text-[14px] font-[400] uppercase'>best-practices</span>
              <div>
                <span className='text-[18px] font-[700] text-white'>{Math.round((alldata[0]?.result?.categories?.["best-practices"]?.score) * 100) || 0}</span>
                <span className='text-[16px] text-[#7c98b6] font-[700]'>/100</span>
              </div>
            </div>
            <div className='flex items-center text-center'>
              <div className='w-[300px] bg-[#DBDBDB] h-[10px] rounded-lg'>
                <div style={{ width: `${(alldata[0]?.result?.categories?.["best-practices"]?.score) * 100}%`, height: '10px', backgroundColor: '#00bda5', borderRadius: '12px' }}>{ }</div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-between'>
              <span className='text-white text-[14px] font-[400] uppercase'>progressive web app</span>
              <div>
                <span className='text-[18px] font-[700] text-white'>{Math.round((alldata[0]?.result?.categories?.pwa?.score) * 100) || 0}</span>
                <span className='text-[16px] text-[#7c98b6] font-[700]'>/100</span>
              </div>
            </div>
            <div className='flex items-center text-center'>
              <div className='w-[300px] bg-[#DBDBDB] h-[10px] rounded-lg'>
                <div style={{ width: `${(alldata[0]?.result?.categories?.pwa?.score) * 100}%`, height: '10px', backgroundColor: '#00bda5', borderRadius: '12px' }}>{ }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[74%] flex flex-col items-center p-5  gap-7 '>
        <div className='flex flex-col items-center'>
          <h1 className='text-[46px] font-[700] underline font-serif text-[#333]'>Web Stats</h1>
          <span className='text-[32px] text-[#33475b] font-semibold'>Results of {(alldata[0]?.result?.finalUrl)?.replace("https://", "")}</span>
        </div>
        <div className='flex flex-col  w-[60%] gap-5'>
          <div className=' border-t-[1.5rem] border-[#33475b] shadow-xl rounded-lg'>
            <Image src={alldata[0]?.result?.audits["final-screenshot"]?.details?.data} alt='image' width={500} height={500} className='w-full h-full' />
          </div>
          <span className='text-[20px] font-serif font-semibold'>Report generated at {moment(Date.now()).format("DD,MMMM YYYY, HH:MM.")} </span>
        </div>
        <div className='mt-5 flex flex-col gap-5 items-center'>
          <Image src={'/perform.svg'} alt='perform' width={150} height={300} />
          <div className='flex items-center text-center'>
            <span className='text-[34px] font-[700] text-[#00bda5]'>{Math.round((alldata[0]?.result?.categories?.performance?.score) * 100) || 0}</span>
            <span className='text-[32px] text-[#33475b] font-[700]'>/100</span>
          </div>
          <div className='w-[300px] bg-[#DBDBDB] h-[10px] rounded-lg'>
            <div style={{ width: `${(alldata[0]?.result?.categories?.performance?.score) * 100}%`, height: '10px', backgroundColor: '#00bda5', borderRadius: '12px' }}>{ }</div>
          </div>
          <span className='text-[#333] text-[32px] font-[700]'>Performance</span>
          <span className='text-center text-[#33475b] text-[16px]'>Optimizing your website's performance is crucial to increasing traffic, improving conversion<br /> rates, generating more leads, and increasing revenue.</span>
        </div>
        <div className='flex flex-col gap-3 items-center w-full'>
          <h1 className='text-[48px] text-[#333] font-[700] underline'>On-Page Results</h1>
          <div className='flex gap-3 flex-wrap justify-center'>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{(newdata[0]?.items[0].meta?.["external_links_count"]) || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>External Links</span> 
            </div>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{(newdata[0]?.items[0].meta?.["internal_links_count"]) || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>Internal Links</span> 
            </div>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{newdata[0]?.items[0].meta?.["images_count"] || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>Image Count</span> 
            </div>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{newdata[0]?.items[0].meta?.["images_size"] || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>Image Size</span> 
            </div>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{newdata[0]?.items[0].meta?.["scripts_count"] || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>Scripts Count</span> 
            </div>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{newdata[0]?.items[0].meta?.["scripts_size"] || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>Scripts Size</span> 
            </div>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{newdata[0]?.items[0].meta?.["stylesheets_count"] || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>Stylesheet Count</span> 
            </div>
            <div className='flex flex-col shadow-xl bg-white p-7 px-12 rounded-md items-center'>
              <span className='text-[#2d3e50] text-[28px] font-[700]'>{newdata[0]?.items[0].meta?.["stylesheets_count"] || 0}</span>
              <span className='text-[#2d3e50] text-[20px] font-[700]'>Stylesheet Size</span> 
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page