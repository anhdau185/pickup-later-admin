

// const MapComponent = ({ props }) => {
//   return (
//     <div>
//       <div id="map"></div>
//       <script>
//         function initMap(){
//           // map options
//           options = {
//             zoom: 15,
//             center: {
//               lat: 10.873671,
//               lng: 106.800613
//             },
//           }

//           // new map
//           var map = new google.maps.Map(document.getElementById('map'), options);

//           addMarker({coords:{lat: 10.869926, lng: 106.80456}, title: "CUA ĐỒNG QUÁN", content: "Đ. Quảng Trường Sáng Tạo, Đông Hoà, Thủ Đức, Bình Dương, Vietnam"})
        
//           function addMarker(props){
//             marker = new google.maps.Marker({
//               position: props.coords,
//               map: map,
//               title: props.title,
//             });
          
//             if (props.content) {
//               var infoWindow = new google.maps.InfoWindow({
//                content: props.content
//               })

//               marker.addListener('click', function(){
//                 infoWindow.open(map, marker)
//               })
//             }
//           }
//         }
//       </script>
      
//       <script async defer
//         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBt7nd_CE9_Vw4s6qW-rCmPWjrpCOoOZVA&callback=initMap">
//       </script>
//     </div>
//   );
// };

// export default MapComponent;
