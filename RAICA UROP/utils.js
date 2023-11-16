function linear_interpolation(a, b, f)
{
    // function to calculate intermediate values between the two ends of the road
    // a denotes the left side of the road
    // b denotes the right side of the road
    // f denotes what fraction of the road we want to occupy
    
    return a + (b-a) *f;
}

function getIntersection(start, end, left_boundary, right_boundary)
{
    const top_road_t = (right_boundary.x - left_boundary.x) * (start.y - left_boundary.y) 
                     - (right_boundary.y - left_boundary.y) * (start.x - left_boundary.x); 
    const top_road_u = (left_boundary.y - start.y) * (start.x - end.x) 
                     - (left_boundary.x - start.x) * (start.y - end.y);
    const bottom = (right_boundary.y - left_boundary.y) * (end.x - start.x)
                 - (right_boundary.x - left_boundary.x) * (end.y - start.y);
    
    if (bottom !=0)
    {
        const t = Math.abs(top_road_t / bottom);
        const u = Math.abs(top_road_u / bottom);

        if(t >= 0 && t <=1 && u >= 0 && u <=1)
        {
            // finds what fraction of sensor is intersecting object in the x and y direction
            return {x: linear_interpolation(start.x, end.x, t),
                    y: linear_interpolation(start.y, end.y, t),
                    offset: t}
        }
    }    
}