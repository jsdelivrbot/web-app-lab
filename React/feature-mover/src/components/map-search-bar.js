import React from 'react';
import MapContainer from './map-contaier';
import ComponentBase from './component-base';
import logo from '../style/info.svg';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Badge,
  Button,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {searchWebmap} from '../actions/index';

class MapSearchBar extends ComponentBase {
  constructor (props) {
    super (props);
    this._bind ('handleWebmapIdChange', 'handleSearchClick');

    this.state = {
      webmapId: '',
    };
  }

  handleWebmapIdChange (evt) {
    evt.preventDefault ();

    this.setState ({
      webmapId: evt.target.value,
    });
  }

  handleSearchClick (evt) {
    evt.preventDefault ();
    this.props.searchWebmap (this.state.webmapId);
  }

  handleDrawGraphic (evt) {
    evt.preventDefault ();
    alert ('draw graphics');
  }

  render () {
    const tooltipMessage = (
      <Tooltip id="map-requirement-tooltip">
        The webmap and the feature layer to update must be shared to the public. The layer must allow updating and adding features
      </Tooltip>
    );

    return (
      <Grid style={{width: '100%'}}>
        <Row>
          <Col>
            <Form horizontal className="mapId-input-form">
              <FormGroup controlId="webmapId">
                <Col componentClass={ControlLabel} smOffset={1} sm={4}>
                  <div>
                    <OverlayTrigger placement="bottom" overlay={tooltipMessage}>
                      <span className="has-tooltip">
                        Enter ArcGIS Online webmap ID <Badge>?</Badge>
                      </span>
                    </OverlayTrigger>
                  </div>
                </Col>
                {' '}
                <Col sm={4}>
                  <FormControl
                    type="text"
                    value={this.state.webmapId}
                    onKeyPress={event => {
                      if (event.key === 'Enter') this.handleSearchClick;
                    }}
                    onChange={this.handleWebmapIdChange}
                    placeholder="55cdda503e054b2a8b4967c716ecd42e"
                  />
                </Col>
                <Col sm={1}>
                  <Button onClick={this.handleSearchClick}>Search</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <MapContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.handleDrawGraphic}>Draw</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect (null, {searchWebmap}) (MapSearchBar);