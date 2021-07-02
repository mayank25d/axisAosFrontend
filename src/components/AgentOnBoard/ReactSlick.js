import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';

import './documents.css';

import tenth from "./documents/10th.jpg";
import tenthPlus from "./documents/12th.jpg";
import pan from "./documents/pan-card.jpg";

const dataSource = [
    {
      small: tenth,
      large: tenth
    },
    {
      small: tenthPlus,
      large: tenthPlus
    },
    {
      small: pan,
      large: pan
    }
];

export default class ReactSlickExample extends Component {
    render() {
        const {
            rimProps,
            rsProps
        } = this.props;

        return (
            <ReactSlick
                {...{
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }}
                {...rsProps}
            >
                {dataSource.map((src, index) => (
                    <div key={index}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Documents',
                                    isFluidWidth: true,
                                    src: src.small,
                                },
                                largeImage: {
                                    src: src.large,
                                    width: 1024,
                                    height: 1800
                                },
                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                            }}
                            {...rimProps}
                        />
                    </div>
                ))}
            </ReactSlick>
        );
    }
}