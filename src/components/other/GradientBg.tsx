import React from 'react'

function GradientBg() {
    return (
        <>
            <div className="absolute top-40 left-1/4 w-1/4 h-80 bg-gradient-to-bl from-red-300 to-red-500 rounded-full filter blur-2xl brightness-75 contrast-75" style={{zIndex:10}}></div>
            <div className="absolute top-40 left-2/4 w-1/4 h-80 bg-gradient-to-bl from-teal-300 to-blue-400 rounded-full filter blur-2xl brightness-75 contrast-80" style={{zIndex:10}}></div>
            <div className="absolute top-40 left-3/4 w-1/4 h-80 bg-gradient-to-r from-teal-200 to-teal-500 rounded-full filter blur-2xl brightness-75 contrast-85" style={{zIndex:10}}></div>
        </>
    )
}

export default GradientBg