import React from 'react';
import Helmet from 'react-helmet';
import MainContainer from './MainContainer/index';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getIncidentsAction } from './actions';
import { getIncidents } from './selectors';
import Title from './MainContainer/components/title';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.dispatchGetIncidents();
  }

  handleOpen = (ev) => {
    this.setState({
      open: true,
      imgSrc: ev.currentTarget.nextSibling.src,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
        <Helmet
          title="Monitorizare Vot"
          meta={[
            { name: 'description', content: 'Acasa' },
          ]}
        />
        <Title />
        <MainContainer {...this.props} handleOpen={this.handleOpen} handleClose={this.handleClose} />
        <Dialog
          title=""
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img role="presentation" src={this.state.imgSrc} />
        </Dialog>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatchGetIncidents: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetIncidents: () => dispatch(getIncidentsAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  incidents: getIncidents(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
