import React from 'react'
import LoadingOverlay from 'react-loading-overlay'
import PropagateLoader from 'react-spinners/PropagateLoader'

function UploadingLoadingOverlay({ show, children }) {
    return (
        <LoadingOverlay
            active={show}
            spinner={<PropagateLoader />}
            styles={{
                overlay: (base) => ({
                    ...base,
                    width: '100vw',
                    height: '100vh',
                    position: "fixed",
                    overflow: 'hidden'
                })
            }}
            text={"Uploading..."}
        >
            {children}
        </LoadingOverlay>
    )
}

export default UploadingLoadingOverlay