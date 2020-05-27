import numpy as np
import random
import matplotlib.pyplot as plt
#Taken Randon cities with its real covid zones provided
predictors=np.array([[15.349955,75.138619],[18.987807,72.836447],[19.639837,77.231495],[22.562627,88.363044],[13.084622,80.248357],[12.977063,77.587106],[17.384052,78.456355],[23.025793,72.587265],[22.576882,88.318566],[18.513271,73.849852],[21.195944,72.830232],[26.430066,80.267176],[26.884682,75.789336],[26.839281,80.923133],[21.203096,79.089284],[25.615379,85.101027],[22.717736,75.85859],[22.299405,73.208119],[23.254688,77.402892],[11.005547,76.966122],[30.912042,75.853789],[27.187935,78.003944],[19.243703,73.135537],[17.704052,83.297663],[9.947743,76.253802],[19.999963,73.776887],[20.999963,77.706356],[21.999963,77.313162],[22.999963,83.005811],[23.999963,77.439148],[24.999963,86.983333],[25.999963,86.185448],[26.999963,78.119622],[27.999963,79.935903],[28.999963,70.793217],[29.999963,86.443244],[30.999963,74.875335],[31.999963,79.600209],[32.999963,81.843217],[33.999963,74.805553],[34.999963,75.346739],[35.999963,81.428497],[36.999963,75.910437],[37.999963,85.338564],[38.999963,73.005943],[39.999963,91.76293],[40.999963,76.788398],[41.999963,78.173369],[42.999963,76.949238],[43.999963,78.696513]])
outcomes=[]
for i in range(50):
    outcomes.append(random.choice([0,1,2]))
outcomes=np.array(outcomes)
def distance(p1,p2):
    """Finds the distance between 2 points"""
    return np.sqrt(np.sum(np.power(p2-p1,2)))
def majority_vote(votes):
    """Finds the most common zone."""
    vote_count={}
    for vote in votes:
        if vote in vote_count:
            vote_count[vote]+=1
        else:
            vote_count[vote]=1
    winners=[]
    max_counts=max(vote_count.values())
    for vote, count in vote_count.items():
        if count==max_counts:
            winners.append(vote)
    return random.choice(winners)
def find_nearest_neighbours(p,points,k):
    """find the k nearest neighbours of point p and return ther index"""
    distances=np.zeros(points.shape[0])
    for i in range(len(distances)):
        distances[i]=distance(p,points[i])
    ind=np.argsort(distances)#returns array of index positions of elements according to which it is sorted.
    return ind[:k]
def knn_predict(p,points,k,outcomes,ind):
    return majority_vote(outcomes[ind])
    # predict the class of p based on majority.
def make_prediction_grid(predictors,outcomes,limits,h,k,n):
    """classify each point on prediction grid"""
    (x_min,x_max,y_min,y_max)=limits
    xs=np.arange(x_min,x_max,h)
    ys=np.arange(y_min,y_max,h)
    xx,yy=np.meshgrid(xs,ys)
    prediction_grid=np.zeros(xx.shape)
    for i,x in enumerate(xs):
        for j,y in enumerate(ys):
            p=np.array([x,y])
            prediction_grid[j,i]=n
    return(xx,yy,prediction_grid)
def plot_prediction_grid (xx, yy, prediction_grid):
    """ Plot KNN predictions for every point on the grid."""
    from matplotlib.colors import ListedColormap
    background_colormap = ListedColormap (["hotpink","orange", "yellowgreen"])
    observation_colormap = ListedColormap (["red","orange","green"])
    plt.figure(figsize =(10,10))
    plt.pcolormesh(xx, yy, prediction_grid, cmap = background_colormap, alpha = 0.5)
    plt.scatter(predictors[:,0], predictors [:,1], c = outcomes, cmap = observation_colormap, s = 50)
    plt.xlabel('East Coordinates'); plt.ylabel('North Coordinates')
    plt.xticks(()); plt.yticks(())
    plt.xlim (np.min(xx), np.max(xx))
    plt.ylim (np.min(yy), np.max(yy))
def execute(var1,var2):
    print("zzzzzzzzzzzzzzzzzzzzzzzzzzzzppppppppppppppppppppppppppppppp")
    x=var1
    y=var2
    p=np.array([x,y])
    k=10
    limits=(0,50,50,100)
    h=1
    zone=""
    ind=find_nearest_neighbours(p,predictors,k)
    n=majority_vote(outcomes[ind])
    (xx,yy,prediction_grid)=make_prediction_grid(predictors,outcomes,limits,h,k,n)
    plot_prediction_grid(xx,yy,prediction_grid)
    plt.figure()
    plt.plot(predictors[outcomes==0][:,0],predictors[outcomes==0][:,1],"ro")
    plt.plot(predictors[outcomes==2][:,0],predictors[outcomes==2][:,1],"go")
    plt.plot(predictors[outcomes==1][:,0],predictors[outcomes==1][:,1],"o",color='orange')
    plt.plot(p[0],p[1],"bo")
    plt.savefig('./'+str(var1)+str(var2)+'.png')

    if(n==0):
        zone="Your Zone is RED. Please do not leave your house."
    elif(n==1):
        zone="Your Zone is ORANGE. Please leave your house only in case of an emergency."
    else:
        zone="Your Zone is GREEN. You are free to go out but be careful."
    print("The Entered Coordinate is in color Blue")

    return zone

execute(23.32, 23.32)
