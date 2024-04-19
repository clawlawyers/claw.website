import React, { Suspense } from 'react';
import { ExpandedCard } from './components/ExpandedCard';
import { CollapsedCard } from './components/CollapsedCard';
import { CardsGroupGrid, CardsGroupSkeleton } from '../components/CardsGroup';

async function latestNewsResource(){
    try {
    } catch (error) {
        
    }
}

export default function News() {
    return (
        <div style={{ position: "inherit", zIndex: 2, width: "80%", margin: "auto" }}>
            <div>
                <ExpandedCard />
            </div>
            <div>
                {/* <Suspense fallback={<CardsGroupSkeleton />}>
                    <CardsGroupGrid component={<CollapsedCard />} />
                </Suspense> */}
            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}
