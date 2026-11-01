import React from 'react'
import usepulmberService from '../hook/useplumberservice'

const AllService = () => {
  const {handleGetallService}=usepulmberService()
  return (
    <div>AllService</div>
  )
}

export default AllService