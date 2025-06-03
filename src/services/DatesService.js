
export default {
    getDates(){
        return dates;
    },

    getDateById(id){
         return dates.find((date) => date.id == id);
    },
    
}

let placeholderObject = {
        id: 1,
        name: 'Moon Thai & Japanese',
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.9448239270328!2d-80.22804948851044!3d26.682247076688412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d92f0f5a2af889%3A0xf6a9ffa6148838ec!2sMoon%20Thai%20%26%20Japanese!5e0!3m2!1sen!2sus!4v1748902194032!5m2!1sen!2sus',
        imageOfPlace: 'https://placehold.co/600x400',
        song: "https://embed.music.apple.com/us/album/when-we-were-friends/1517139758?i=1517139760",
        articleTitle: 'Our First Date',
        datetime: 'October 15th 2025',
        Description: [
            'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
            'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
            'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        ]
    }


const dates = [
    placeholderObject,
    placeholderObject,
    placeholderObject,
]