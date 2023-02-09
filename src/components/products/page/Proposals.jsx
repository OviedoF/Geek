import { faCheck, faImage, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './Proposals.scss'
import CreatingProposalModal from './CreatingProposalModal.jsx'
import ProposalImagesModal from './ProposalImagesModal';
import ProposalCard from './ProposalCard';

const Proposals = ({owner, product, auth}) => {
    const [isCreating, setIsCreating] = useState(false);
    const [activeProposalImages, setActiveProposalImages] = useState(false);
    const [haveProposal, setHaveProposal] = useState(false);

    useEffect(() => {
        product.proposals.forEach(proposal => {
            if(proposal.user._id === auth._id) {
                setHaveProposal(true)
            }
        })
    }, []);

    return (
        <section className='proposal_section'>
            <h2>Propuestas</h2>

            {activeProposalImages && <ProposalImagesModal setActiveProposalImages={setActiveProposalImages} images={activeProposalImages} />}
            {isCreating && <CreatingProposalModal setHaveProposal={setHaveProposal} productId={product._id} setIsCreating={setIsCreating} />}
            
            {!owner && !haveProposal && <div onClick={() => setIsCreating(true)} className="create_proposal_button">
                <FontAwesomeIcon icon={faPlus} />
                <p>¡Quiero ofertar!</p>
            </div>}
            
            {haveProposal && <div className="create_proposal_button" style={{color: 'var(--color-success)'}}>
                <FontAwesomeIcon icon={faCheck} />
                <p>¡Ya has ofertado!</p>
            </div>}

            <div className='proposals_container'>
                {product.proposals.map(proposal => (
                    <ProposalCard key={proposal._id} proposal={proposal} setActiveProposalImages={setActiveProposalImages} />
                ))}
            </div>

        </section>
    );
}

export default Proposals;
