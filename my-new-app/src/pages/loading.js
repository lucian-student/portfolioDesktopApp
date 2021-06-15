import React, { Fragment } from 'react';
import { VscLoading } from 'react-icons/vsc';
import '../css/loading.css';

function Loading() {
    return (
        <Fragment>
            <div className='loading-wrapper'>
                <VscLoading className='loading-icon' />
            </div>
        </Fragment>
    )
}

export default Loading;