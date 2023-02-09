import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ImageGallery from '../../../libs/ImageGallery';
import './ProposalImagesModal.scss';
import {motion} from 'framer-motion';

const ProposalImagesModal = ({images, setActiveProposalImages}) => {
    return (
        <motion.div id='proposal_images_modal' animate={{transform: 'scale(1)'}}>
            <div className="gallery_container">
                <ImageGallery images={images} />
            </div>

            <FontAwesomeIcon icon={faXmark} color={'white'} onClick={() => setActiveProposalImages(false)} />
        </motion.div>
    );
}

export default ProposalImagesModal;
