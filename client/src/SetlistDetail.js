import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSetlist, deleteJoke } from './actions';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

class SetlistDetail extends Component {

  // onDeleteClick(id) {
  //   this.props.deleteJoke(id, () => {
  //     this.props.selectJoke(null);
  //     this.props.history.push('/jokes');
  //   });
  // }

  render() {
    const { setlist } = this.props;

    if (!setlist) {
      return <div className="select">Please Select A Setlist</div>
    }

    return (
      <div>
        {setlist.name}
        {setlist.id}
      </div>

      // <div className='joke_detail_container'>
      //   <div className="joke_detail item">
      //     <div className="row">
      //       <div className="col-8">Title</div>
      //       <div className="col">Duration</div>
      //       <div className="col">Rating</div>
      //     </div>
      //     <div className="row">
      //       <div className="col-8">{joke.name}</div>
      //       <div className="col">{joke.minutes}:{joke.seconds} </div>
      //       <div className="col">{joke.rating}</div>
      //     </div>

      //     <div className="content">{joke.content}</div>

      //   </div>
      //   <div className="detail_buttons">
      //     <Link to="/updatejoke" className="btn edit_button"><i className="fa fa-edit"></i></Link>
      //     <button type="button" className="btn delete_button" data-toggle="modal" data-target=".bd-example-modal-sm">
      //       <i className="fa fa-trash"></i>
      //     </button>
      //   </div>
      //   <ConfirmModal onDeleteClick={this.onDeleteClick.bind(this)} name={joke.name} jokeId={joke.id}/>
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    setlist: state.activeSetlist
  };
};

export default connect(mapStateToProps, {deleteJoke, selectSetlist})(SetlistDetail);