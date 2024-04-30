import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Produk"}))
      }, [])

    return(
        <>
            <h1>Produk</h1>
        </>
    )
}

export default InternalPage