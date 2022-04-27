import React from 'react'
import Helmet from '../../components/Helmet'
import HeroSlider from '../../components/HeroSlider'

import heroSliderData from '../../assets/hero-slider'
import policies from '../../assets/policies'
import Section, { SectionBody, SectionTitle } from '../../components/Section'
import PolicyCard from '../../components/PolicyCard'

function Home() {
  return (
    <Helmet title="Home">
      {/* Slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeOut={6000}
      />
      {/* End slider */}
      {/* Policy section */}
      <Section>
        <SectionTitle>
          Policies
        </SectionTitle>
        <SectionBody>
          <div className="grid wide">
            <div className="row">
              {policies.map((policy, index) => (
                <div
                  key={index}
                  className="col l-4 m-6 c-12">
                  <PolicyCard
                    icon={policy.icon}
                    name={policy.name}
                    description={policy.description}
                  />
                </div>
              ))}

            </div>
          </div>
        </SectionBody>
      </Section>
    </Helmet>
  )
}

export default Home
