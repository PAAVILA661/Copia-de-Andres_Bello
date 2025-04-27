import type React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  title: string;
  image: string;
}

interface CourseProjectsProps {
  title: string;
  description: string;
  projects: Project[];
}

const CourseProjects: React.FC<CourseProjectsProps> = ({
  title,
  description,
  projects,
}) => {
  return (
    <Card className="bg-codedex-navy border-codedex-gold/10">
      <CardContent className="p-6">
        <h3 className="text-white font-medium mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">
          {description}
        </p>

        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={`project-${index}`}
              className="bg-codedex-darkNavy border border-codedex-gold/10 rounded-md p-3 flex items-center gap-3 hover:bg-codedex-darkNavy/70 transition-colors cursor-pointer"
            >
              {project.image && (
                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-sm text-codedex-gold">{project.title}</div>
            </div>
          ))}
        </div>

        <div className="relative mt-6 pt-6 border-t border-gray-800">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-codedex-navy px-2 text-gray-400 text-xs">
            POWERED BY
          </div>
          <div className="flex justify-center">
            <Image
              src="https://ext.same-assets.com/1748103887/1764963315.png"
              alt="Codedex"
              width={20}
              height={20}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProjects;
