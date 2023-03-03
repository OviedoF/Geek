import React from 'react';
import { faCheck, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProposalCard.scss';
import rupiaImage from '../../../images/rupia.png';
import formatPrice from '../../../libs/FormPrice.js';

const ProposalCard = ({setConfirmModal, proposal, owner, setActiveProposalImages}) => {
    if(proposal.images[0]) return (
        <div className="proposal_card">
           {proposal.images[0] && <img src={proposal.images[0]} className={'product_image'} alt='propuesta' />}

           <div className="text_proposal">
               <div className="user">
                   <img src={proposal.user.userImage} alt="usuario propuesta" />
                   <h2>{proposal.user.name}</h2>
               </div>

               <p className='proposal_comment'>{proposal.comment}</p>

               {proposal.amount !== 0 && <div className="amount">
                    <img src={rupiaImage} alt='rupias' className='rupia_image' />
                    <h2>{formatPrice(12542)}</h2>
                </div>}

               <div className="buttons">
                   {proposal.images[0] && <button onClick={() => setActiveProposalImages(proposal.images)}><FontAwesomeIcon icon={faImage} /> Ver imágenes</button>}
                   {owner && <button onClick={(e) => setConfirmModal(proposal)}><FontAwesomeIcon icon={faCheck} /> ¡Aceptar!</button>}
               </div>
           </div>
       </div>
    )

    return (
        <div className="proposal_card">
            <div className="text_proposal only_amount">
                <div className="user">
                    <img src={proposal.user.userImage} alt="usuario propuesta" />
                    <h2>{proposal.user.name}</h2>
                </div>

                <p className='proposal_comment'>{proposal.comment}</p>

                <div className="amount">
                    <img src={rupiaImage} alt='rupias' className='rupia_image' />
                    <h2>{formatPrice(proposal.amount)}</h2>
                </div>

                <div className="buttons">
                    {proposal.images[0] && <button onClick={() => setActiveProposalImages(proposal.images)}><FontAwesomeIcon icon={faImage} /> Ver imágenes</button>}
                    {owner && <button><FontAwesomeIcon icon={faCheck} onClick={(e) => setConfirmModal(true)}/> ¡Aceptar!</button>}
                </div>
            </div>
        </div>
    )
}

export default ProposalCard;
