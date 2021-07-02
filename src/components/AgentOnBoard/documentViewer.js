import { Component } from "react";
import ReactSlick from './ReactSlick';

class DocumentViewer extends Component {
  render() {
    return(
      <div className="perimeter">
        <div className="image">
          <ReactSlick {...{
                rimProps: {
                    isHintEnabled: true,
                    shouldHideHintAfterFirstActivation: false,
                    enlargedImagePosition: 'over'
                }
            }} />
        </div>
      </div>
    );
  }
}

export default DocumentViewer; 