import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  team = [
    {
      name: "Reagan Clayton",
      bio: "I am Reagan and I am a Computer Science student at Colorado State University. Before I began attending CSU, I was a self-taught WebDev. Since then, I have began to move more toward the security side of things, as my concentration at CSU is Networks and Security.",
      image: "images/Companypic.jpg"
    },
    {
      name: "Chandler Brown",
      bio: "I started my collegiate journey at a small school in West Virgina named Shepherd Unviersity.It was there I was working to attain my degree in Computer Engineering. After three years however, I deciced to transfer to Colorado State Unviersity and change my major to that of Ccomputer Science. As of now I am a Junior working to complete my BS in Computer Science and am excited to see what opertunities await me in this field.",
      image: "images/propic.jpg"
    },
    {
      name: "Carter Manchester",
      bio: "Insert bio here.",
      image: "images/propic.jpg"
    },
    {
      name: "Payton Paplow",
      bio: "Hello, my name is Payton Paplow, and I am a Computer Science major in my junior year at CSU. If I’m not doing schoolwork I’m usually at the gym, reading, or trying to get active outdoors.",
      image: "images/images.png"
    }
  ]
}
