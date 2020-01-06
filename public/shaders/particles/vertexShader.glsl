const float size = 1000.0;

attribute float radius;
attribute float longitude;
attribute float latitude;
attribute float speed;

uniform float time;
uniform float uAudioBandsBuffer[8];

varying float average;


mat4 rotationX( in float angle ) {
	return mat4(	1.0,		0,			0,			0,
			 		0, 	cos(angle),	-sin(angle),		0,
					0, 	sin(angle),	 cos(angle),		0,
					0, 			0,			  0, 		1);
}

mat4 rotationY( in float angle ) {
	return mat4(	cos(angle),		0,		sin(angle),	0,
			 				0,		1.0,			 0,	0,
					-sin(angle),	0,		cos(angle),	0,
							0, 		0,				0,	1);
}

mat4 rotationZ( in float angle ) {
	return mat4(	cos(angle),		-sin(angle),	0,	0,
			 		sin(angle),		cos(angle),		0,	0,
							0,				0,		1,	0,
							0,				0,		0,	1);
}

void main() {

    float x = radius * sin(longitude ) * cos(latitude);
    float y = radius * sin(longitude) * sin(latitude);
    float z = radius * cos(longitude);


    average = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2] + uAudioBandsBuffer[3] +
        uAudioBandsBuffer[4] + uAudioBandsBuffer[5] + uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 8.0;


    vec3 pos = vec3(x,y,z);
   
    vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 ) ;
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
}