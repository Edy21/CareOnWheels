#include <Wire.h>
void setup() {
  Wire.begin();
  pinMode(8, OUTPUT);
  Serial.begin(9600);
}

void loop(){
  
  char a[2];
  
  a[0] = Serial.read();
  a[1] = Serial.read();

  Wire.beginTransmission(8);
  if(a[0] == 'w') Wire.write(1 * 10 + ((int)a[1]- '0'));
  if(a[0] == 's') Wire.write(2* 10 + ((int)a[1]- '0'));
  if(a[0] == 'a') Wire.write(3);
  if(a[0] == 'd') Wire.write(4);
  if(a[0] == 't') Wire.write(0);
  
  Wire.endTransmission();
  //Serial.println(a);
  delay(1000);
}
