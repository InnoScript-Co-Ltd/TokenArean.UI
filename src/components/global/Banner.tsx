import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BannerProps {
  title: string;
  path1?: string;
  path2?: string;
}

const Banner = ({ title, path1, path2 }: BannerProps) => {
  return (
    <div className="mb-5 flex flex-col gap-3 border-t border-black px-5 py-3">
      <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl capitalize tracking-wide font-semibold text-primary">
        {title}
      </h3>
      <Breadcrumb className=" ml-2">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {path1 || path2 ? (
            <>
              {path1 && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/${path1.toLowerCase()}`}>
                      {path1}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              {path2 && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/${path1?.toLowerCase()}/${path2.toLowerCase()}`}
                    >
                      {path2}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Banner;
