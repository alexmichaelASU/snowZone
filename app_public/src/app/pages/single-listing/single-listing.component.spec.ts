import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleListingComponent } from './single-listing.component';

describe('SingleListingComponent', () => {
  let component: SingleListingComponent;
  let fixture: ComponentFixture<SingleListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
