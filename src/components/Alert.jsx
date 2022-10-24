import { propTypes } from 'react-bootstrap/esm/Image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)


function Alert(props) {
    const status = props.status;
  return (
    <div>
       {
        
        
        MySwal.fire({
                title: <strong>{props.title}</strong>,
                html: <i>{props.message}</i>,
                icon: {status}
            })
        }
    </div>
  )
}

export default Alert
