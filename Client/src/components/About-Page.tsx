import { MapPinned } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="w-screen flex flex-col items-center text-center space-y-6 my-20">
      <Badge
        className="crimson-pro rounded-xl border-2 text-txt border-pri"
        variant="outline"
      >
        <MapPinned /> | Yangon, Myanmar
      </Badge>

      <div className="text-txt montserrat text-base sm:text-xl md:text-2xl lg:text-3xl w-11/12 sm:w-96">
        We're creating the service we wish we had
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-7 items-center justify-center gap-6">
        {/* First Profile */}
        <div className="flex flex-row-reverse sm:flex-row items-center space-x-4 sm:space-x-4 space-x-reverse justify-center p-3 bg-bgu sm:bg-transparent sm:border-0 rounded-xl border-1 border-pri">
          <div className="flex flex-col justify-center text-center sm:text-center">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
              Morgan W.
            </span>
            <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
              co-founder, designer
            </span>
          </div>

          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Second Profile */}
        <div className="flex flex-row items-center space-x-4 justify-center p-3 bg-bgu sm:bg-transparent rounded-xl border-1 border-pri sm:border-0">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center text-center sm:text-center">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
              Morgan W.
            </span>
            <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
              co-founder, designer
            </span>
          </div>
        </div>
      </div>
      <Card className="w-full max-w-md border-black rounded-none border-b-pri sm:border-pri p-4">
        <CardHeader className="text-2xl text-left crimson-pro font-semibold border-b-2 pb-3 border-pri">
          Story
        </CardHeader>
        <CardContent className="text-sm montserrat text-txt text-left leading-relaxed h-auto">
          Once upon a time in a quiet village nestled between rolling hills,
          there lived a young girl named Elara. She was no ordinary
          child—curious, imaginative, and fearless. Her heart belonged to the
          forest nearby, where she spent countless hours reading, sketching, and
          pretending the trees were ancient guardians of a forgotten world.
          <br />
          <br />
          One rainy afternoon, as the sky painted itself in shades of ash and
          mist, Elara discovered a moss-covered archway deep in the woods. It
          wasn’t there the day before. Intrigued, she stepped through and found
          herself in a place unlike anything she had known—a realm where time
          stood still, where the flowers whispered poems, and the rivers ran
          with stardust.
          <br />
          <br />
          She met creatures of legend: talking foxes, glowing deer, and a great
          owl who served as the Keeper of Dreams. Elara learned that this land
          was slowly fading because its stories were forgotten in the real
          world. The magic here only survived if remembered, spoken, and passed
          on.
          <br />
          <br />
          So Elara, with her heart full of wonder and a journal clutched tightly
          in her hands, began documenting everything—every tale, every fable,
          every whisper of history she encountered. She became a bridge between
          two worlds. The longer she stayed, the more the realm bloomed. Color
          returned to its skies, laughter to its fields, music to its winds.
          <br />
          <br />
          But time was different there. When Elara finally returned to her
          village, decades had passed, yet she had not aged a day. People didn’t
          recognize her, but her stories—now published as books—ignited
          imaginations around the globe.
          <br />
          <br />
          The once-forgotten magical realm thrived again, restored through the
          belief and curiosity of readers young and old. Elara continued to
          write, visiting the realm in her dreams, ensuring its legacy endured
          for generations.
          <br />
          <br />
          And so, the girl who followed a hidden path became the storyteller who
          saved a world—one word at a time.
        </CardContent>
      </Card>
      <div className="flex flex-row items-center space-x-4 justify-center p-3 rounded-xl">
        <div className="flex flex-col justify-center text-center sm:text-center">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
            Morgan W.
          </span>
          <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
            co-founder, designer
          </span>
        </div>

        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-pri border-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center text-center sm:text-center">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
            Morgan W.
          </span>
          <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
            co-founder, designer
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-4 justify-center p-3 rounded-xl">
        <div className="flex flex-col justify-center text-center sm:text-center">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
            Morgan W.
          </span>
          <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
            co-founder, designer
          </span>
        </div>
        
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-pri border-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center text-center sm:text-center">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
            Morgan W.
          </span>
          <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
            co-founder, designer
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-4 justify-center p-3 rounded-xl mb-20">
        <div className="flex flex-col justify-center text-center sm:text-center">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
            Morgan W.
          </span>
          <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
            co-founder, designer
          </span>
        </div>
        
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-pri border-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center text-center sm:text-center">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold crimson-pro">
            Morgan W.
          </span>
          <span className="text-sm montserrat sm:text-sm md:text-sm text-gray-500">
            co-founder, designer
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
